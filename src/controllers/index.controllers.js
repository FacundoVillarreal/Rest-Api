const { Pool } = require('pg');

//parametros de conexion
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'firstapi',
    port: '5432'
})


const getUsers = async (req, res, next) => {
    // consulta a postgresql = pool.query(....);
    const response = await pool.query('select * from users');
    res.json(response.rows);
}

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    res.json(response.rows)
}

const createUser = async (req, res, next) => {
    const { name, email } = req.body;

    const response = await pool.query('INSERT INTO users(name, email) VALUES ($1, $2)', [name, email])
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: { name, email }
        }
    })
};

const updateUser = async (req, res, next) => {
    const { id } = req.params
    const { name, email } = req.body

    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name, 
        email, 
        id
    ]);
    console.log(response)
    res.json('User Updated Succesfully')
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id])
    response.rowCount == 1 && res.json(`User ${id} Deleted Succesfully`)
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}