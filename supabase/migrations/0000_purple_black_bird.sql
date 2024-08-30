CREATE TABLE IF NOT EXISTS "short_links" (
	"short_url" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "short_links_url_unique" UNIQUE("url")
);
