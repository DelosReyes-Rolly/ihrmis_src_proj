<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_status', function (Blueprint $table) {
            $table->unsignedInteger('sts_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('sts_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->unsignedTinyInteger('sts_app_stg_id')->comment('Stage ID. Identifies the stage being referenced.');
            $table->unsignedTinyInteger('sts_app_complete')->comment('Indicator if applicant has completed all requirements. [0-No, 1-Yes].');
            $table->text('sts_app_remarks')->comment('Remarks. Includes but not limited to reason of change, comments, notes, etc.');
            $table->primary(['sts_app_id', 'sts_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_status');
    }
}
