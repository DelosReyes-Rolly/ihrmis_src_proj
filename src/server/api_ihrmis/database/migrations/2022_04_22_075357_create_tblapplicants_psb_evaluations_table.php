<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsPsbEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_psb_evaluations', function (Blueprint $table) {
            $table->unsignedInteger('psb_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->unsignedInteger('psb_usr_id')->comment('User ID. Identifies the HRMPSB member/evaluator who did the evaluation.');
            $table->unsignedInteger('psb_bat_id')->comment('Battery ID. Identifies the specific battery (Attribute, Accomplishment, or Performance) being referred to.');
            $table->unsignedTinyInteger('psb_score')->comment('Score given by the evaluator.');
            $table->string('psb_remarks')->comment('Remarks. Includes but not limited to comments, explanation, notes, etc.');
            $table->primary(['psb_app_id', 'psb_usr_id', 'psb_bat_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_psb_evaluations');
    }
}
