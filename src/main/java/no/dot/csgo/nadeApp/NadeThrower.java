package no.dot.csgo.nadeApp;

import no.dot.csgo.nadeApp.nade.Nade;

/**
 * This class combines the nade class and the player class. In each strat a nade is thrown by a specific
 * player. This class makes to correlation between the nade begin thrown and the player responsible for
 * throwing the nade
 */
public class NadeThrower
{
    private final Player player;
    private final Nade nade;

    /**
     * Creates an instance of a nadethrower
     *
     * @param player the player to throw the nade
     * @param nade the nade to be thrown
     */
    public NadeThrower(Player player, Nade nade)
    {
        this.player = player;
        this.nade = nade;
    }

    /**
     * Returns the player to throw the nade
     *
     * @return the player to throw the nade
     */
    public Player getPlayer()
    {
        return this.player;
    }

    /**
     * Returns the nade that if being thrown
     *
     * @return the nade being thrown
     */
    public Nade getNade()
    {
        return this.nade;
    }
}
