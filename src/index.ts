import StartupExpress from './1.0 - presentation/startup';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8011;
const app = StartupExpress.createExpress();

// Start app
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});