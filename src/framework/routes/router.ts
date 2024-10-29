import { Express } from 'express';
import monitRouter from '../monit/monit';
import { setupSwagger } from '../config/swagger';
import userRouter from '../../infrastructure/user/users.route';
import petRouter from './../../infrastructure/routes/petRouter';

export const RouterBuilder = (app: Express) => {
    app.use('/api/monit', monitRouter);
    app.use('/api/user', userRouter);
    app.use('/api/pet', petRouter);
    setupSwagger(app);
};

export default { RouterBuilder };
