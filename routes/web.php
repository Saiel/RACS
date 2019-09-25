<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

Route::get('/', static function () {
    return view('welcome');
});

Route::get('/datestart', function (Request $request) {
    return Storage::disk('local')->get('date-start.dat');
});

Route::get('/locks', function (Request $request) {
    $off = 0;
    $limit = 20;
    if ($request->has('off')) {
        $off = $request->input('off');
    }
    if ($request->has('limit')) {
        $limit = $request->input('limit');
    }

    $locks = DB::table('locks')
        ->select('l_id', 'user_id', 'u.email', 'last_echo')
        ->join('users as u', 'locks.user_id', '=', 'u.u_id')
        ->offset($off)
        ->limit($limit)
        ->get();

    return response()->json($locks);
});
