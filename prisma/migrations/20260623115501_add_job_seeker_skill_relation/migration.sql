-- CreateTable
CREATE TABLE "job_seeker_skills" (
    "job_seeker_profile_id" UUID NOT NULL,
    "skill_id" UUID NOT NULL,

    CONSTRAINT "job_seeker_skills_pkey" PRIMARY KEY ("job_seeker_profile_id","skill_id")
);

-- AddForeignKey
ALTER TABLE "job_seeker_skills" ADD CONSTRAINT "job_seeker_skills_job_seeker_profile_id_fkey" FOREIGN KEY ("job_seeker_profile_id") REFERENCES "job_seeker_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_skills" ADD CONSTRAINT "job_seeker_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
