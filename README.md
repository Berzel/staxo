## How to install

1. Make sure you've docker installed
2. Pull the repository to your local machine
3. `cd` into the repository
4. Install composer dependancies `composer install`
5. Install npm dependancies `npm install`
6. Create the environment file `cp .env.example .env`
7. Generate the application key `php artisan key:generate`
8. Start sail services `./vendor/bin/sail up -d`
9. Migrate the database `./vendor/bin/sail artisan:migrate`
10. Seed the database `./vendor/bin/sail db:seed`
11. Visit localhost on your browser