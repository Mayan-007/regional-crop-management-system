import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import bcrypt from "bcrypt";

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	console.log("🌱 Starting seed...");

	//
	// ADMINS
	//

	const passwordHash = await bcrypt.hash("admin123", 10);

	const superAdmin = await prisma.admin.upsert({
		where: {
			email: "superadmin@agri.com",
		},
		update: {},
		create: {
			firstName: "Super",
			lastName: "Admin",
			email: "superadmin@agri.com",
			passwordHash,
			role: "SUPER_ADMIN",
		},
	});

	const blockAdmin = await prisma.admin.upsert({
		where: {
			email: "blockadmin@agri.com",
		},
		update: {},
		create: {
			firstName: "Block",
			lastName: "Admin",
			email: "blockadmin@agri.com",
			passwordHash,
			role: "BLOCK_ADMIN",

			scopeState: "Gujarat",
			scopeDistrict: "Ahmedabad",
			scopeBlock: "Sanand",
		},
	});

	//
	// CROPS
	//

	const wheat = await prisma.crop.create({
		data: {
			name: "Wheat",
			variety: "Sharbati",
			scientificName: "Triticum aestivum",

			category: "CEREAL",
			season: "RABI",

			expectedYieldPerAcre: 18.5,

			harvestCycleDays: 120,

			waterRequirementMm: 450,

			soilSuitability: "Loamy Soil",

			description: "High-quality wheat variety suitable for Rabi season.",
		},
	});

	const cotton = await prisma.crop.create({
		data: {
			name: "Cotton",
			variety: "Bt Cotton",

			scientificName: "Gossypium",

			category: "CASH_CROP",

			season: "KHARIF",

			expectedYieldPerAcre: 12.0,

			harvestCycleDays: 180,

			waterRequirementMm: 700,

			soilSuitability: "Black Soil",

			description: "Widely cultivated cash crop in Gujarat.",
		},
	});

	//
	// FARMERS
	//

	const farmer1 = await prisma.farmer.create({
		data: {
			firstName: "Ramesh",
			lastName: "Patel",

			contactNumber: "9876543210",

			email: "ramesh@example.com",
		},
	});

	const farmer2 = await prisma.farmer.create({
		data: {
			firstName: "Suresh",
			lastName: "Chaudhary",

			contactNumber: "9876543211",

			email: "suresh@example.com",
		},
	});

	//
	// FARMS
	//

	const farm1 = await prisma.farm.create({
		data: {
			farmerId: farmer1.id,

			farmName: "Green Valley Farm",

			totalAreaAcres: 12.5,

			soilType: "Loamy",

			irrigationType: "CANAL",

			state: "Gujarat",
			district: "Ahmedabad",
			block: "Sanand",
			village: "Telav",

			latitude: 23.020181,
			longitude: 72.439655,
		},
	});

	const farm2 = await prisma.farm.create({
		data: {
			farmerId: farmer2.id,

			farmName: "Sunrise Farm",

			totalAreaAcres: 20,

			soilType: "Black",

			irrigationType: "DRIP",

			state: "Gujarat",
			district: "Ahmedabad",
			block: "Daskroi",
			village: "Lambha",

			latitude: 23.01,
			longitude: 72.58,
		},
	});

	//
	// FARMING RECORDS
	//

	await prisma.farmingRecord.create({
		data: {
			farmId: farm1.id,

			cropId: wheat.id,

			status: "HARVESTED",

			sowingDate: new Date("2025-11-01"),

			predictedHarvestDate: new Date("2026-03-01"),

			actualHarvestDate: new Date("2026-03-10"),

			predictedQuantity: 230,

			actualQuantity: 210,

			lossQuantity: 20,

			remarks: "Unexpected rainfall affected harvest quality.",

			lossReason: "Heavy rainfall during late harvest stage.",
		},
	});

	await prisma.farmingRecord.create({
		data: {
			farmId: farm2.id,

			cropId: cotton.id,

			status: "GROWING",

			sowingDate: new Date("2026-06-01"),

			predictedHarvestDate: new Date("2026-11-15"),

			predictedQuantity: 400,

			remarks: "Healthy crop growth observed during inspection.",
		},
	});

	console.log("✅ Seed completed successfully.");
}

main()
	.catch((error) => {
		console.error(error);

		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
