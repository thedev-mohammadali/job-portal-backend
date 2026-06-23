-- CreateTable
CREATE TABLE "company_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "industry" VARCHAR(100) NOT NULL,
    "website_url" TEXT,
    "founded_year" INTEGER,
    "description" TEXT,
    "hr_email" VARCHAR(150) NOT NULL,
    "support_email" VARCHAR(150),
    "phone" VARCHAR(30) NOT NULL,
    "logo_url" TEXT,
    "linkedin_url" TEXT,
    "twitter_url" TEXT,
    "facebook_url" TEXT,
    "instagram_url" TEXT,
    "employee_count" INTEGER,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_profiles_user_id_key" ON "company_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
