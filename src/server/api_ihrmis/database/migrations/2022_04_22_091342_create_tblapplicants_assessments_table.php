<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_assessments', function (Blueprint $table) {
            $table->unsignedInteger('ass_id')->primary()->comment('Assessment ID. A unique identification of records.');
            $table->unsignedTinyInteger('ass_education')->comment('Score received for education achieved.');
            $table->unsignedTinyInteger('ass_experience')->comment('Score received for knowledge or skill acquired by experience.');
            $table->unsignedTinyInteger('ass_training')->comment('Score received for trainings acquired.');
            $table->text('ass_remarks')->comment('Remarks on Job Competency. Includes but not limited to description, breakdown, explanation, notes, etc.');
            $table->date('ass_exam_date')->comment('Date of pre-employment examination.');
            $table->text('ass_exam_remarks')->comment('Remarks on Pre-employment Exam. Includes but not limited to description, comment, explanation, notes, etc.');
            $table->date('ass_psych_date')->comment('Date of psychological testing.');
            $table->text('ass_psych_remarks')->comment('Remarks on Psychological Testing. Includes but not limited to description, breakdown, explanation, notes, etc.');
            $table->date('ass_psb_eval_date')->comment('Date of the HRMPSB Evaluation.');
            $table->text('ass_attribute')->comment('Remarks on Attribute in the HRMPSB evaluation. Includes but not limited to description, comment, explanation, notes, etc.');
            $table->text('ass_accomplishment')->comment('Remarks on Commendable Accomplishments in the HRMPSB evaluation. Includes but not limited to description, comment, explanation, notes, etc.');
            $table->text('ass_performance')->comment('Remarks on Performance in the HRMPSB evaluation. Includes but not limited to description, comment, explanation, notes, etc.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_assessments');
    }
}
