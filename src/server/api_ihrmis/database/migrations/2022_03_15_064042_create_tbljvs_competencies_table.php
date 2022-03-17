<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbljvsCompetenciesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbljvs_competencies', function (Blueprint $table) {
            $table->unsignedInteger('com_jvs_id')->comment('JVS ID. Identifies the related JVS-CR form.');
            $table->char('com_type', 2)->comment('Competency Type. [WE-Written Exam, OE-Oral Exam, CW-Creative Work, AS-Analytical Skills, CS-Computation Skills, OT-Others, ED-Education, TR-Training, EX-Experience].');
            $table->text('com_specific')->nullable()->comment('Specific job competency in details.');
            $table->primary(['com_jvs_id', 'com_type']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbljvs_competencies');
    }
}
