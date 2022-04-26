<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsReferenceCheckTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_reference_check', function (Blueprint $table) {
            $table->unsignedInteger('chk_ref_id')->comment('Reference ID. Identifies the related applicant reference.');
            $table->string('chk_ref_email', 100)->comment('Email address of the reference as a secondary key.');
            $table->char('chk_question', 5)->comment('A unique referencing code that represents a question in the Employment Background Check form.');
            $table->text('chk_answer')->comment('Answer given to the corresponding question.');
            $table->primary(['chk_ref_id', 'chk_ref_email']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_reference_check');
    }
}
