import { Router, Request, Response } from 'express';
import Toode from "../models/toode";
import Kategooria from "../models/kategooria";

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const toodeData = await Toode.find();
        res.json(toodeData);
    } catch (error) {
        console.error('Error retrieving toode data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/toode', async (req: Request, res: Response) => {
    try {
        const { nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg } = req.body;
        const newToode = new Toode({ nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg });
        const savedToode = await newToode.save();
        res.status(201).json(savedToode);
    } catch (error) {
        console.error('Error adding toode data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/toode/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const  {nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg } = req.body;
        const updatedToode = await Toode.findByIdAndUpdate(id, { nimetus, kategooria, hind, pildiURL, aktiivne, laokogus, vananemisaeg }, { new: true });
        if (!updatedToode) {
            return res.status(404).json({ error: 'Toode not found' });
        }
        res.json(updatedToode);
    } catch (error) {
        console.error('Error updating toode data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;