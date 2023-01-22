package no.edvardsen.backend.repositories;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Repository;

/**
 * Repository for managing file system
 * 
 * @author /home/joakim/dev/csgo-nade-app/backend/target/classes/CT_1https://www.baeldung.com/java-db-storing-files
 */
@Repository
public class FileSystemRepository {

  private final String RESOURCES_DIR = FileSystemRepository.class.getResource("/").getPath();
  private final String VIDEO_DIR = RESOURCES_DIR + "/lineup-videos/";

  /**
   * Saves a file to the filesystem
   * 
   * @param content  of the file
   * @param fileName name of the file
   * @return a string with the path to the file
   * @throws Exception
   */
  public String save(byte[] content, String fileName) throws Exception {
    Path newFile = Paths.get(VIDEO_DIR + fileName);
    Files.createDirectories(newFile.getParent());

    Files.write(newFile, content);

    return newFile.toAbsolutePath().toString();
  }

  /**
   * Returns a file from the file system
   * 
   * @param location of the file
   * @return the file as stream
   */
  public FileSystemResource findInFileSystem(String location) {
    try {
      return new FileSystemResource(Paths.get(location));
    } catch (Exception e) {
      throw new RuntimeException();
    }
  }

}
