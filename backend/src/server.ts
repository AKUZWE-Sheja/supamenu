require('dotenv').config();
import express from 'express';
import * as dotenv from 'dotenv';
import { startServer } from './app';

const app = express();
app.use(express.json());

startServer();




