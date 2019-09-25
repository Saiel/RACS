<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Provider\DateTime;


class LocksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        for ($i = 1; $i < 10; $i++) {
            DB::table('users')->insert([
                'first_name' => Str::random(10),
                'last_name' => Str::random(10),
                'email' => Str::random(5).'@ex.com',
                'password' => Str::random(10),
                'u_id' => $i,
            ]);
            DB::table('locks')->insert([
                'user_id' => random_int(1, $i),
                'last_echo' => DateTime::iso8601(),
            ]);
        }
    }
}
