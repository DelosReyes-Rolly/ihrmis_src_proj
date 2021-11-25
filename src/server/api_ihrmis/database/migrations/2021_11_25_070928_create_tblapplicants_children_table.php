<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsChildrenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_children', function (Blueprint $table) {
            $table->unsignedInteger('chi_app_id')->index('chi_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->string('chi_app_name', 150)->comment('Child\'s full name.');
            $table->date('chi_app_birthdate')->comment('Child\'s birthdate or date of birth.');
            $table->timestamp('chi_timestamp_id')->useCurrent()->comment('Unique id for children');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_children');
    }
}
