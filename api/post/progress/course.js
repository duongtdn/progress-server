"use strict"

const { verifyToken } = require('@stormgle/jtoken-util')

const secret = process.env.AUTH_KEY_LEARNDESK

function authen() {
  return verifyToken(secret);
}

function updateUserProgress (db) {
  return function (req, res, next) {

    if (req.params && req.params.course) {
      const uid = req.user.uid;
      const courseId = req.params.course;
      const progress = req.body.progress;

      if (!courseId || !progress) {
        res.status(400).send();
        return
      }

      db.progress.updateProgress(
        { uid, courseId, progress },
        (err, data) => {
          if (err) {
            console.log(err)
            res.status(400).send();
            return
          }
          res.status(200).json({ status: 200 });     
        }
      )
    } else {
      res.status(400).send();
    }
  }
}

module.exports = [ authen, updateUserProgress ]