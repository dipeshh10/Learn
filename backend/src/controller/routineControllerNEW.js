console.log('routineControllerNEW.js minimal test loaded');
module.exports = {
  // Create a new routine
  createRoutine: async (req, res) => {
    try {
      const { subject, teacherId, teacherName, room, time, day, courseId, courseName, duration, createdBy, isActive } = req.body;
      const { Routine } = require('../models');
      const routine = await Routine.create({
        subject,
        teacherId,
        teacherName,
        room,
        time,
        day,
        courseId,
        courseName,
        duration,
        createdBy,
        isActive
      });
      res.status(201).json(routine);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create routine', details: error.message });
    }
  },

  // Get all routines
  getAllRoutines: async (req, res) => {
    try {
      const { Routine } = require('../models');
      const routines = await Routine.findAll();
      res.json(routines);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch routines', details: error.message });
    }
  },

  // Get routine by ID
  getRoutineById: async (req, res) => {
    try {
      const { Routine } = require('../models');
      const routine = await Routine.findByPk(req.params.id);
      if (!routine) return res.status(404).json({ error: 'Routine not found' });
      res.json(routine);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch routine', details: error.message });
    }
  },

  // Update routine
  updateRoutine: async (req, res) => {
    try {
      const { Routine } = require('../models');
      const routine = await Routine.findByPk(req.params.id);
      if (!routine) return res.status(404).json({ error: 'Routine not found' });
      await routine.update(req.body);
      res.json(routine);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update routine', details: error.message });
    }
  },

  // Delete routine
  deleteRoutine: async (req, res) => {
    try {
      const { Routine } = require('../models');
      const routine = await Routine.findByPk(req.params.id);
      if (!routine) return res.status(404).json({ error: 'Routine not found' });
      await routine.destroy();
      res.json({ success: true, message: 'Routine deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete routine', details: error.message });
    }
  }
};
