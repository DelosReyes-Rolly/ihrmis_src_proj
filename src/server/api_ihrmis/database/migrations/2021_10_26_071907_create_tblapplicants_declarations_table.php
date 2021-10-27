<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsDeclarationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_declarations', function (Blueprint $table) {
            $table->unsignedInteger('dec_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->string('dec_app_question', 5)->comment('Question that needs to be answered. Represented in a unique referencing code. ');
            $table->unsignedTinyInteger('dec_app_yes')->comment('Indicator if answer to the question is Yes. [0-No, 1-Yes].');
            $table->string('dec_app_details')->comment('Details if the answer to the question is Yes.');
            $table->date('dec_app_date')->comment('Detail that requires a date answer. ');
            $table->primary(['dec_app_id', 'dec_app_question']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_declarations');
    }
}
