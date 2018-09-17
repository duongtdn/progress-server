"use strict"

const { verifyToken } = require('@stormgle/jtoken-util')

const secret = process.env.AUTH_KEY_LEARNDESK

function authen() {
  return verifyToken(secret);
}

function getUserProgressForCourse (db) {
  return function (req, res, next) {

    if (req.params && req.params.course) {
      const uid = req.user.uid;
      const courseId = req.params.course;

      if (!courseId) {
        res.status(400).send();
        return
      }

      db.progress.getProgress(
        { uid, courseId },
        (err, data) => {
          if (err) {
            console.log(err)
            res.status(400).send();
            return
          }
          if (data === null) {
            data = {}
          } 
          res.status(200).json({ data });     
        }
      )
    } else {
      res.status(400).send();
    }
  }
}

module.exports = [ authen, getUserProgressForCourse ]