import app from './app'
import dotenv from 'dotenv'
import { AppDataSource } from './data-source';

dotenv.config({path: './config.env'});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(()=>{
        console.log("Data source has been initialised");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
    })
    .catch((err) => {
        console.error("Error during Data source initialization failed", err);
    });