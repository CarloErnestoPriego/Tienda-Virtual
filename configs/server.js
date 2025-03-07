'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import { postRoles } from '../src/roles/role.controller.js';
import authRoutes from '../src/auths/auth.routes.js';
import authProducts from '../src/products/products.routes.js';
import authCategory from '../src/categories/categories.routes.js';
import authCart from '../src/Shopping/shopping.routes.js';

const middlewares = (app)=>{
    app.use(express.urlencoded({extended:false}));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
}

const routes = (app) =>{
    app.use('/virtualStore/v1/auth', authRoutes);
    app.use('/virtualStore/v1/product', authProducts);
    app.use('/virtualStore/v1/category', authCategory);
    app.use('/virtualStore/v1/cart', authCart);
}

const conectarDB = async()=>{
    try {
        await dbConnection();
        console.log('Conexion a la base de datos exitosa');
        postRoles();
    } catch (error) {
        console.error('Error conectando a la base de datos',error);
        process.exit(1);
    }
}

export const initServer= async()=>{
    const app = express();
    const port = process.env.port || 3000;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`)
    } catch (e) {
        console.log(`Server init failed: ${e}`)
    }
}