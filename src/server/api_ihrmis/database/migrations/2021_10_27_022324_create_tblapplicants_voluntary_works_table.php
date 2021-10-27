<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsVoluntaryWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_voluntary_works', function (Blueprint $table) {
            $table->unsignedInteger('vol_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('vol_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->string('vol_app_org')->comment('Full name of the organization where involved as voluntary worker.');
            $table->string('vol_app_addr')->comment('Address of the organization.');
            $table->date('vol_app_from')->comment('Starting date of involvement.');
            $table->date('vol_app_to')->comment('Ending date of involvement.');
            $table->unsignedTinyInteger('vol_app_hours')->comment('Number of hours rendered.');
            $table->string('vol_app_work', 150)->comment('Position or voluntary work rendered.');
            $table->primary(['vol_app_id', 'vol_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_voluntary_works');
    }
}
