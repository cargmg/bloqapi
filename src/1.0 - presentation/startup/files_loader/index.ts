import fs from "fs"
import BloqMongoRepository from "../../../3.0 - data/repositories/bloq/implementations/mongoRepository"

export default class FilesLoader {
  static load() {
    try {
        const bloqs = fs.readFileSync("src/1.0 - presentation/startup/files_loader/data/bloqs.json", "utf-8")
        const lockers = fs.readFileSync("src/1.0 - presentation/startup/files_loader/data/lockers.json", "utf-8")
        const rents = fs.readFileSync("src/1.0 - presentation/startup/files_loader/data/rents.json", "utf-8")

        BloqMongoRepository.alreadyLoaded()
          .then(alreadyExists => {
            if(!alreadyExists){
              BloqMongoRepository.loadFrom(JSON.parse(bloqs), JSON.parse(lockers), JSON.parse(rents))
                .then(() => console.log(`Database loaded.`));
            }
          }
        );
      } catch (error) {
        console.log(`An error occured while loading initial data. ${error}`)
      }
  }
}
