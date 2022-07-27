<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeOtherInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_other_info', function (Blueprint $table) {
            $table->integer('oth_id', true)->comment('Employee other info');
            $table->unsignedInteger('oth_emp_id')->index('oth_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->char('oth_emp_type', 5)->comment('Define the type of credential being referred to like skills and hobbies, non-academic distinctions/recognition, or membership in association/organization. [SKILL-Skills, RECOG-Recognitions, MEMBR-Memberships].');
            $table->string('oth_emp_desc', 150)->comment('Describe or specify the credential identified.  ');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_other_info');
    }
}
