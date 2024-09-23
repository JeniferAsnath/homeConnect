
const prisma = require('@prisma/client');

async function saveImage(houseId, bailleurId, url) {
  const image = await prisma.image.create({
    data: {
      url,
      house : {connect : { id : houseId}},
      bailleur : {connect : {id :  bailleurId}}
    },
  });
  return image;
}

module.exports = {
  saveImage,
};