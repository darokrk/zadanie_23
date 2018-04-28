import Lane from '../models/lane';
import Note from "../models/note";
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function editLaneName(req, res) {
	Lane.findOneAndUpdate(
		{ id: req.params.laneId },
		{ $set: { name: req.body.name } }
	).exec((err, lane) => {
		if (err) {
			res.status(500).send(err);
		}

		res.json(lane);
	});
}

export function moveNoteBetweenLane(req, res) {
	Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
		if (err) {
			res.status(500).send(err);
		}
		const note = lane.notes.find(note => note.id === req.body.noteId);
		const sourceIndex = lane.notes.indexOf(note);
		lane.notes.splice(sourceIndex, 1);
		lane.save(err => {
			if (err) {
				res.status(500).send(err);
			}
			res.json(lane);
		});
		Lane.findOne({ id: req.body.targetLaneId }).then(targetLane => {
			targetLane.notes.push(note);
			targetLane.save(err => {
				if (err) {
					res.status(500).send(err);
				}
			});
		});
	});
}