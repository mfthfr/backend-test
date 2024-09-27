const Member = require('../models/member');
const sequelize = require('../config/database');

describe('Member Mode', () => {
    beforeAll(async() => {
        await sequelize.sync();
        await sequelize.sync({force: true});
    });
    
    it('should create a new member', async() => {
        const member = await Member.create({
            code: 'M001',
            name: 'Angga'
        });

        expect(member.code).toBe('M001');
        expect(member.name).toBe('Angga');
    });

    afterAll(async() =>{
        await sequelize.close();
    });
});