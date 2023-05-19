const { PrismaClient } = require('@prisma/client');
const {faker} = require('@faker-js/faker/locale/en');

const prisma = new PrismaClient();

async function seed() {
    try {
        // Clear the database
        await prisma.commentaire.deleteMany();
        await prisma.article.deleteMany();
        await prisma.utilisateur.deleteMany();
        await prisma.categorie.deleteMany();

        // Create 10 utilisateurs with the role 'AUTHOR'
        const utilisateurs = [];
        for (let i = 0; i < 10; i++) {
        const utilisateur = await prisma.utilisateur.create({
            data: {
                nom: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: 'AUTHOR',
            },
        });
        utilisateurs.push(utilisateur);
        }

        // Create 1 utilisateur with the role 'ADMIN'
        const adminUtilisateur = await prisma.utilisateur.create({
        data: {
            nom: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: 'ADMIN',
        },
        });

        // Create 10 categories
        const categories = [];
        for (let i = 0; i < 10; i++) {
            const categorie = await prisma.categorie.create({
                data: {
                    nom: faker.word.sample(),
                },
            });
            categories.push(categorie);
        }

        // Create 100 articles with random categories and authors
        for (let i = 0; i < 100; i++) {
            const randomCategories = faker.helpers.arrayElements(categories, faker.number.int({ min: 1, max: 4 }));
            const randomAuthor = faker.helpers.arrayElement(utilisateurs);
            const article = await prisma.article.create({
            data: {
                titre: faker.lorem.sentence(),
                contenu: faker.lorem.paragraphs(),
                image: faker.image.url(), 
                utilisateur: { connect: { id: randomAuthor.id } },
                categories: {
                connect: randomCategories.map((category) => ({ id: category.id })),
                },
                published: true, 
            },
            });
        
            // Create 0 to 20 random comments for each article
            const numberOfComments = faker.number.int({ min: 0, max: 20 });
            for (let j = 0; j < numberOfComments; j++) {
                await prisma.commentaire.create({
                    data: {
                    email: faker.internet.email(),
                    contenu: faker.lorem.sentences(),
                    article: { connect: { id: article.id } },
                    },
                });
            }
        }

        console.log('Data inserted successfully.');

    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
