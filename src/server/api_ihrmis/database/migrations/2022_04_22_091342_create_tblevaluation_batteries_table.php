<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblevaluationBatteriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblevaluation_batteries', function (Blueprint $table) {
            $table->increments('bat_id')->comment('Battery ID. A unique identification of records.');
            $table->string('bat_name', 150)->comment('Name or description of the battery.');
            $table->unsignedTinyInteger('bat_points')->comment('Maximum points or score that can be attained for a particular battery.');
            $table->unsignedTinyInteger('bat_grp_id')->comment('Group ID. Identifies group/category/section being referenced.	');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblevaluation_batteries');
    }
}
