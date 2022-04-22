<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_scores', function (Blueprint $table) {
            $table->unsignedInteger('sco_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->unsignedInteger('sco_bat_id')->comment('Battery ID. Identifies the specific battery being referred to.');
            $table->unsignedTinyInteger('sco_int_score')->comment('Integer score. When scoring metric is numeric.');
            $table->string('sco_str_score', 5)->comment('String score. When scoring metric is literal.');
            $table->primary(['sco_app_id', 'sco_bat_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_scores');
    }
}
