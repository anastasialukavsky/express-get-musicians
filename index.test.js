// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require('supertest');
const { db } = require('./db/connection');
const { Musician } = require('./models/index');
const { Band } = require('./models/index');
const app = require('./src/app');
const seedMusician = require('./seedData');

describe('./musicians endpoint', () => {
  let musicianId;

  beforeAll(async () => {
    const newMusician = await Musician.create({
      name: 'John Doe',
      instrument: 'Guitar',
    });
    musicianId = newMusician.id;
  });

  it('should get all musicians', async () => {
    const res = await request(app).get('/musicians');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a musician by ID', async () => {
    const res = await request(app).get(`/musicians/${musicianId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(musicianId);
  });

  it('should create a new musician', async () => {
    const newMusicianData = { name: 'Jane Doe', instrument: 'Piano' };
    const res = await request(app).post('/musicians').send(newMusicianData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a musician', async () => {
    const updatedMusicianData = { name: 'Updated Name' };
    const res = await request(app)
      .put(`/musicians/${musicianId}`)
      .send(updatedMusicianData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Name');
  });

  it('should delete a musician', async () => {
    const res = await request(app).delete(`/musicians/${musicianId}`);
    expect(res.statusCode).toEqual(204);
  });
});

describe('/bands endpoint', () => {
  let bandId;

  beforeAll(async () => {
    const newBand = await Band.create({ name: 'The Beatles', genre: 'Rock' });
    bandId = newBand.id;
  });

  it('should get all bands', async () => {
    const res = await request(app).get('/bands');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a band by ID', async () => {
    const res = await request(app).get(`/bands/${bandId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(bandId);
  });

  it('should create a new band', async () => {
    const newBandData = { name: 'Led Zeppelin', genre: 'Rock' };
    const res = await request(app).post('/bands').send(newBandData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a band', async () => {
    const updatedBandData = { name: 'Updated Band Name' };
    const res = await request(app)
      .put(`/bands/${bandId}`)
      .send(updatedBandData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Band Name');
  });

  it('should delete a band', async () => {
    const res = await request(app).delete(`/bands/${bandId}`);
    expect(res.statusCode).toEqual(204);
  });

});
