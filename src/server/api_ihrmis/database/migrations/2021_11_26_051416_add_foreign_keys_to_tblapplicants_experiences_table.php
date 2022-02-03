<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblapplicantsExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblapplicants_experiences', function (Blueprint $table) {
            $table->foreign('exp_app_id', 'tblapplicants_experiences_ibfk_1')->references('app_id')->on('tblapplicants_profile')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblapplicants_experiences', function (Blueprint $table) {
            $table->dropForeign('tblapplicants_experiences_ibfk_1');
        });
    }
}
