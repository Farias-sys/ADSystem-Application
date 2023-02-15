// @Author: Farias-sys
// Last-update: 12/12/2022 by Farias-sys
// File description: Routes file

// Call the express framework
const { application } = require("express")
const express = require("express")
const routes = express()
const jwt = require("jsonwebtoken");
// Call the auth controllers

const LoginController = require('./scripts/auth/db/controllers/login')
const LoggedController = require('./scripts/auth/db/controllers/logged')
const DisconnectController = require('./scripts/auth/db/controllers/disconnect')

// Call Data Management functions

const ReadTables = require('./scripts/data/crud/read/readTables')
const ReadExpenses = require('./scripts/data/crud/read/getExpenses')
const GenReports = require("./scripts/data/crud/read/genReports")
const DeleteRow = require('./scripts/data/crud/delete/deleterows')
const CreateTransaction = require('./scripts/data/crud/input/includeTransaction')
const CreateItemInventory = require('./scripts/data/crud/input/includeItemInventory')
const CreateDepartment = require('./scripts/data/crud/input/configs/includeDepartment')
const CreateCategory = require('./scripts/data/crud/input/configs/includeCategory')
const CreateMeasurementUnit = require('./scripts/data/crud/input/configs/includeMeasurementUnits')
const CreateUser = require('./scripts/data/crud/input/configs/includeUsers')
const CreateProvider = require('./scripts/data/crud/input/configs/includeProvider')
const CreateShopRequest = require('./scripts/data/crud/input/includeShopRequest')
const genReport = require("./scripts/data/crud/read/genReports");
const ManageShopRequest = require("./scripts/data/crud/delete/manageShopRequests")
const UpdateInventory = require('./scripts/data/crud/update/updateInventory')

const ResetPassword = require('./scripts/auth/db/controllers/user/resetpwd')

const ImageController = require('./middlewares/uploadImage')
const modelUsers = require('./scripts/auth/db/tables/users')

const pix = require('./scripts/auth/register/pix')
// Set where the HTML files will be displayed (Temporary before ReactJS)

const views = __dirname + "/views/"

// API Auth

routes.post('/auth/login', async (req, res) => {res.send(await LoginController(res, req.body))
})
routes.get('/auth/logged', async (req, res) => {res.status(200).send(await LoggedController(req, res))})
routes.post('/auth/disconnect', async (req, res) => {res.status(200).send(await DisconnectController(res))})
routes.post('/auth/reset_user', async(req, res) => {res.status(200).send(await ResetPassword(req.body))})

// Read API

routes.post('/api/data/read', async (req, res) => {res.status(200).send(await ReadTables(await LoggedController(req), req.body, res))})
routes.post('/api/data/read/getexpenses', async(req, res) => {res.status(200).send(await ReadExpenses(await LoggedController(req), req.body))})


// Create API

routes.post('/api/data/create/transaction', async (req, res) => {res.status(200).send(await CreateTransaction(await LoggedController(req), req.body))})
routes.post('/api/data/create/inventory', async(req, res) => {res.status(200).send(await CreateItemInventory(await LoggedController(req), req.body))} )
routes.post('/api/data/create/shoprequest', async(req,res) => {res.status(200).send(await CreateShopRequest(await LoggedController(req), req.body))})

routes.post('/api/data/create/configs/department', async(req, res) => {res.status(200).send(await CreateDepartment(await LoggedController(req), req.body))} )
routes.post('/api/data/create/configs/category', async(req, res) => {res.status(200).send(await CreateCategory(await LoggedController(req), req.body))} )
routes.post('/api/data/create/configs/measurement_unit', async(req, res) => {res.status(200).send(await CreateMeasurementUnit(await LoggedController(req), req.body))})
routes.post('/api/data/create/configs/user', async(req, res) => {res.status(200).send(await CreateUser(await LoggedController(req), req.body))})
routes.post('/api/data/create/configs/provider', async (req, res) => {res.status(200).send(await CreateProvider(await LoggedController(req), req.body))})

routes.post('/api/data/avatar', ImageController.single('image'), async (req, res) => {    
    if (req.file) {
    user_data = await LoggedController(req)
    tenant = user_data.tenant
    username = user_data.username
    await modelUsers.update({image_path:req.file.filename}, {where:{tenant_id:tenant, username:username}})
        return res.json({
            erro: false,
            mensagem: "Upload realizado com sucesso!"
        });
    }

return res.status(400).json({
    erro: true,
    mensagem: "Erro: Upload não realizado com sucesso, necessário enviar uma imagem PNG ou JPG!"
})})

// Delete API

routes.post('/api/data/delete', async(req, res) => {res.status(200).send(await DeleteRow(await LoggedController(req), req.body))})

// Update API

routes.post('/api/data/update/inventory', async(req, res) => {res.status(200).send(await UpdateInventory(await LoggedController(req), req.body))})

// Utils API

routes.post('/api/utils/printpdf', async(req,res) => {res.status(200).send(await GenReports(req.body, req, res))})

// Shop requests

routes.post('/api/data/shoprequest/aprove', async(req, res) => {res.status(200).send(await ManageShopRequest(await LoggedController(req), req.body, "approve"))})
routes.post('/api/data/shoprequest/deny', async(req, res) => {res.status(200).send(await ManageShopRequest(await LoggedController(req), req.body, "deny"))})

// Export module

module.exports = routes;