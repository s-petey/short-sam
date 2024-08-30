CREATE TABLE IF NOT EXISTS "short_links" (
	"link_id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"short_url" text NOT NULL
);
