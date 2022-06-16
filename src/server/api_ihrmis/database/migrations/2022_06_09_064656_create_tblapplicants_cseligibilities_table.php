<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicantsCseligibilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplicants_cseligibilities', function (Blueprint $table) {
            $table->unsignedInteger('cse_app_id')->comment('Applicant ID. Identifies the related applicant.');
            $table->dateTime('cse_app_time')->useCurrent()->comment('Timestamp or date and time the record is created. Served as a secondary key for a unique identification of records.');
            $table->string('cse_app_title', 150)->comment('Title or name of the Career Service/ RA1080 (Board/ Bar) Under Special Laws/ CES/ CSEE/ Barangay Eligibility/ Driver\'s License earned.');
            $table->date('cse_app_date')->comment('Date the eligibility exam was taken.');
            $table->string('cse_app_place', 150)->comment('Place where the eligibility exam took place.');
            $table->double('cse_app_rating', 5, 2)->unsigned()->comment('Final rating achieved from the eligibility exam taken.');
            $table->string('cse_app_license', 30)->comment('License number if earned eligibility entails a license.');
            $table->date('cse_app_validity')->comment('Date of validity if earned eligibility entails a license.');
            $table->primary(['cse_app_id', 'cse_app_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplicants_cseligibilities');
    }
}
