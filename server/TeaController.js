const Tea = require('./TeaModel');

const TeaController = {};
// Logic for handling requests and talking to the model; where you get, create, update, & delete teas
// const TeaController = {
//   createTea (req, res, next) {
//     console.log("req.body", req.body);
//     const { name, origin, caffeineLevel, image, type, description, color } = req.body
//     console.log("name",name)
//     const newTea = Tea.create(req.body)
//       .then((createdTea) => res.locals.teas = createdTea)
//       .catch((err) => {
//         console.error('Error creating tea', err);
//         return next({
//           log: 'TeaController.createTea: Error creating tea in db',
//           status: 404,
//           message: { err: 'Failed to create tea' },
//         });
//       });
//   },
// };

TeaController.createTea = async (req, res, next) => {
  const { name, origin, caffeineLevel, image, type, description, color } =
    req.body;
  //console.log(req.body);
  //console.log("name",name)
  const newTea = await Tea.create({
    name: name,
    origin: origin,
    caffeineLevel: caffeineLevel,
    image: image,
    type: type,
    description: description,
    color: color,
  });
  console.log('newTea', newTea);
  res.locals.teas = newTea;
  //console.log(res.locals.teas)
  return res.status(201).json(newTea);
};

TeaController.getTeas = (req, res, next) => {
  Tea.find({})
    .then((teas) => {
      //console.log(teas);
      res.locals.teas = teas;
      next();
    })
    .catch((err) => {
      next({
        log: 'error in get teas',
        status: 500,
        message: { err: 'error in get teas' },
      });
    });
};

TeaController.deleteTea = (req, res, next) => {
  // const { id } = req.params;

  Tea.findByIdAndDelete(req.params.id)
    .then((tea) => {
      //console.log('deleted tea', tea);
      res.locals.deletedTea = tea;
      res.status(200).json(res.locals.teas);
      // return next()
    })
    .catch((err) => {
      next({
        log: 'error deleting tea',
        status: 500,
        message: { err: 'error deleting tea' },
      });
    });
};

TeaController.updateTea = async (req, res, next) => {
  console.log('entering updateTea in tea controller');
  const { id } = req.params;
  const update = req.body;
  // findbyidandupdate(original, updatedVersion)
  console.log('id ', id);
  console.log('update', update);
  try {
    const updatedTea = await Tea.findByIdAndUpdate(
      id,
      { $set: update },
      // views updated version immediately
      // run validators in our Tea Schema?
      { new: true, runValidators: false }
    );
    //res.locals.teas = updatedTea;
    res.status(200).json(updatedTea);
  } catch (err) {
    return next({
      log: 'Error in TeaController.updateTea' + err,
      status: 400,
      message: { err: 'Failed to update tea' },
    });
  }
};

// Tea.findByIdAndUpdate(
//   // { name: req.body.name },
//   // { origin: req.body.origin },
//   // { caffeineLevel: req.body.caffeineLevel },
//   // { image: req.body.image },
//   // { type: req.body.type },
//   // { description: req.body.description },
//   // { color: req.body.color }
// )

module.exports = TeaController;
