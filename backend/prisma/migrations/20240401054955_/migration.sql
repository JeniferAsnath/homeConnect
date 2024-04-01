-- AlterTable
CREATE SEQUENCE bailleur_id_seq;
ALTER TABLE "Bailleur" ALTER COLUMN "id" SET DEFAULT nextval('bailleur_id_seq');
ALTER SEQUENCE bailleur_id_seq OWNED BY "Bailleur"."id";

-- AlterTable
CREATE SEQUENCE visiteur_id_seq;
ALTER TABLE "Visiteur" ALTER COLUMN "id" SET DEFAULT nextval('visiteur_id_seq');
ALTER SEQUENCE visiteur_id_seq OWNED BY "Visiteur"."id";
