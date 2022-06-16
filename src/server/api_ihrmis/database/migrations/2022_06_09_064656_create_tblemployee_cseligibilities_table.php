<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblemployeeCseligibilitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblemployee_cseligibilities', function (Blueprint $table) {
            $table->integer('cse_id', true)->comment('Cse Eligibility identifier');
            $table->unsignedInteger('cse_emp_id')->index('cse_emp_id')->comment('Employee ID. Identifies the related employee.');
            $table->string('cse_emp_title', 150)->comment('Title or name of the Career Service/ RA1080 (Board/ Bar) Under Special Laws/ CES/ CSEE/ Barangay Eligibility/ Driver\'s License earned.');
            $table->date('cse_emp_date')->comment('Date the eligibility exam was taken.');
            $table->string('cse_emp_place', 150)->comment('Place where the eligibility exam took place.');
            $table->float('cse_emp_rating', 5)->unsigned()->comment('Final rating achieved from the eligibility exam taken.');
            $table->string('cse_emp_license', 30)->comment('License number if earned eligibility entails a license.');
            $table->date('cse_emp_validity')->comment('Date of validity if earned eligibility entails a license.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblemployee_cseligibilities');
    }
}
