import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongoClient } from 'mongodb';

describe('UsersService', () => {
  let service: UsersService;
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('', {
      useNewUrlParser: true,
    });
    db = await connection.db('nestjs_test');
    console.log(db);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
