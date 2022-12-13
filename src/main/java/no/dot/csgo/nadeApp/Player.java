package no.dot.csgo.nadeApp;

/**
 * Represents a player in the application.
 * A player throws the nades in a strat, and can have mulitple nade lineups
 * for each strat.
 *
 * This class focuses only on the player.
 * A player has a username and an avatar.
 */
public class Player
{
    private final String username;
    private final String avatar;

    /**
     * Creates an instance of a player
     *
     * @param username for the user
     * @param avatar path to the img file
     */
    public Player(String username, String avatar)
    {
        this.username = username;
        this.avatar = avatar;
    }

    /**
     * Returns the username of the player
     *
     * @return username of the player
     */
    public String getUsername()
    {
        return this.username;
    }

    /**
     * Returns the path to the avatar img
     *
     * @return path to img
     */
    public String getAvatar()
    {
        return this.avatar;
    }
}
