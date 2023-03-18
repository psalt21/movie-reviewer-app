import connectMongo from "@/database/conn";
import Users from "@/model/schema";
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({error: 'Connection Failed...!'}));

    if(req.method === 'POST') {
        if (!req.body) {
            return res.status(404).json({ error: 'Form data is missing...!' });
        }
        const { username, email, password } = req.body;

        // check for duplicate users
        const checkExisting = await Users.findOne({ email });
        if (checkExisting) {
            return res.status(422).json({ message: 'User already exists...!' });
        }

        Users.create({username, email, password: await hash(password, 12)})
            .then(result => {
                res.status(201).json({ status: true, user: result });
            })
            .catch(err => {
                res.status(404).json({ err });
            });

    } else {
        res.status(500).json({message: 'HTTP method not valid. Only POST requests accepted.'})
    }
}
