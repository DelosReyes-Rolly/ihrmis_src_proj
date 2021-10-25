<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsOtherInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_other_info', function (Blueprint $table) {
            $table->unsignedInteger('oth_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('oth_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->char('oth_app_type', 5)->comment('Define the type of credential being referred to like skills and hobbies, non-academic distinctions/recognition, or membership in association/organization. [SKILL-Skills, RECOG-Recognitions, MEMBR-Memberships].');
            $table->string('oth_app_desc', 150)->comment('Describe or specify the credential identified.  ');
            $table->primary(['oth_app_id', 'oth_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_other_info');
    }
}
