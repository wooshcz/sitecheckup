
-- DROP TABLE public.jobs;

CREATE TABLE public.jobs (
	job_id uuid NOT NULL,
	status varchar NULL,
	results json NULL,
	created timestamptz NOT NULL,
	"type" varchar NOT NULL,
	url varchar NULL,
	CONSTRAINT jobs_pk PRIMARY KEY (job_id)
);
CREATE INDEX jobs_created_idx ON public.jobs USING btree (created);
CREATE UNIQUE INDEX jobs_job_id_idx ON public.jobs USING btree (job_id);

-- DROP TABLE public.users;

CREATE TABLE public.users (
	email varchar NOT NULL,
	"name" varchar NULL,
	hash varchar NULL,
	CONSTRAINT users_pk PRIMARY KEY (email)
);
CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);
