import express, { Express } from 'express';
import authRouter  from './modules/auth/auth.routes';
import restoRouter  from './modules/resto/resto.routes';
import menuRouter  from './modules/menu/menu.routes';
import categoryRouter  from './modules/category/category.routes';
import itemRouter  from './modules/item/item.routes';
import orderRouter from './modules/order/order.routes';
import { notFound } from './middleware/not-found';
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from "helmet";
import { cspOptions, rateLimiter } from './utils/security';

export function createApp(): Express {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(cookieParser());
    app.use(helmet());
    app.use(rateLimiter);
    app.use(express.json());

    // Logging Middleware
    app.use((req, res, next) => {
        console.log(`Request received: ${req.method} ${req.url}`);
        next();
    });

    // Swagger Setup
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'SUPAMENU API',
                description: 'Restful API Documentation',
                contact: {
                    name: 'Edwige Akuzwe Sheja'
                },
                version: '1.0.0',
            },
            servers: [
                { url: "http://localhost:9000" }
            ],
            components: {
                securitySchemes: {
                    Bearer: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [
                {
                    Bearer: [],
                },
            ],
            tags: [
                { name: 'auth', description: 'Everything about your Authentication' },
                { name: 'restaurants', description: 'Everything about the Restaurants' },
                { name: 'menus', description: 'Everything about the Menus' },
                { name: 'categories', description: 'Everything about the Categories' },
                { name: 'items', description: 'Everything about the Items' },
                { name: 'orders', description: 'Everything about the Orders' },
            ],
        },
        apis: [
            "./src/modules/auth/*.ts",
            "./src/modules/resto/*.ts",
            "./src/modules/menu/*.ts",
            "./src/modules/category/*.ts",
            "./src/modules/item/*.ts",
            "./src/modules/order/*.ts",
        ],
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    // Routes
    app.use('/auth', authRouter);
    app.use('/restaurants', restoRouter);
    app.use('/menus', menuRouter);
    app.use('/categories', categoryRouter);
    app.use('/items', itemRouter);
    app.use('/orders', orderRouter);

    // Default Route
    app.get("/", (req, res) => {
        res.send("Supamenu API is running");
    });

    // Not Found Middleware
    app.use(notFound);

    return app;
}

export function startServer() {
    const app = createApp();

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    // CORS Headers
    app.use((req, res, next) => {
        const origin = req.headers.origin || "*";
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
        );
        next();
    });

    app.use(helmet.contentSecurityPolicy(cspOptions));
}
