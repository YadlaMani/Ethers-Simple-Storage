const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.RPC_PROVIDER,
    );

    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    const wallet = await ethers.Wallet.fromEncryptedJsonSync(
      encryptedJson,
      process.env.PRIVATE_KEY_PASSWORD,
    );
    const connectedWallet = wallet.connect(provider);

    const abi = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.abi",
      "utf8",
    );
    const binary = fs.readFileSync(
      "./SimpleStorage_sol_SimpleStorage.bin",
      "utf8",
    );
    const contractFactory = new ethers.ContractFactory(
      abi,
      binary,
      connectedWallet,
    );

    console.log("Deploying contract...");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed at address:", contract.address);

    const currentFavoriteNumber = await contract.retrieve();
    console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

    const transactionResponse = await contract.store("4");
    await transactionResponse.wait(1);

    const updatedFavoriteNumber = await contract.retrieve();
    console.log(`Updated Favorite Number: ${updatedFavoriteNumber.toString()}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error in main function:", error);
    process.exit(1);
  });
