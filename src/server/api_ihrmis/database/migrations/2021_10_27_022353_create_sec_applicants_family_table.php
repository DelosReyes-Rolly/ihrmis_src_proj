<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSecApplicantsFamilyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysql2')->create('sec_applicants_family', function (Blueprint $table) {
            $table->unsignedInteger('app_id')->unique('app_id')->comment('Applicant ID. A unique identification of records.');
            $table->string('app_sps_nm_last', 50)->comment('Spouse\'s last name.');
            $table->string('app_sps_nm_first', 50)->comment('Spouse\'s first name.');
            $table->string('app_sps_nm_mid', 50)->comment('Spouse\'s middle name in full.');
            $table->string('app_sps_nm_extn', 10)->comment('Spouse\'s name extension (e.g. Jr., Sr.).');
            $table->string('app_sps_occupation', 150)->comment('Spouse\'s occupation.');
            $table->string('app_sps_bus_name')->comment('Name of company/business where spouse is affiliated.');
            $table->string('app_sps_bus_addr')->comment('Address of spouse\'s company/business.');
            $table->string('app_sps_tel_no', 50)->comment('Telephone or contact number of spouse.');
            $table->string('app_fthr_nm_last', 50)->comment('Father\'s last name.');
            $table->string('app_fthr_nm_first', 50)->comment('Father\'s first name.');
            $table->string('app_fthr_nm_mid', 50)->comment('Father\'s middle name in full.');
            $table->string('app_fthr_nm_extn', 10)->comment('Father\'s name extension. (e.g. Jr., Sr.).');
            $table->string('app_mthr_nm_last', 50)->comment('Mother\'s last name of her maiden name.');
            $table->string('app_mthr_nm_first', 50)->comment('Mother\'s first name of her maiden name.');
            $table->string('app_mthr_nm_mid', 50)->comment('Mother\'s full middle name of her maiden name.');
            $table->string('app_mthr_nm_extn', 10)->comment('Mother\'s name extension of her maiden name, if any.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysql2')->drop('sec_applicants_family', function (Blueprint $table) {
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        });
    }
}
