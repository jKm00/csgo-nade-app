export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      maps: {
        Row: {
          created_at: string | null
          id: number
          name: string
          radar: string
          thumbnail: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          radar: string
          thumbnail: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          radar?: string
          thumbnail?: string
        }
      }
      nades: {
        Row: {
          created_at: string | null
          id: number
          impact_img: string | null
          impact_x: number
          impact_y: number
          lineup_img: string | null
          lineup_x: number
          lineup_y: number
          name: string
          strat_id: number
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          impact_img?: string | null
          impact_x: number
          impact_y: number
          lineup_img?: string | null
          lineup_x: number
          lineup_y: number
          name: string
          strat_id: number
          type: string
        }
        Update: {
          created_at?: string | null
          id?: number
          impact_img?: string | null
          impact_x?: number
          impact_y?: number
          lineup_img?: string | null
          lineup_x?: number
          lineup_y?: number
          name?: string
          strat_id?: number
          type?: string
        }
      }
      profile_pictures: {
        Row: {
          created_at: string | null
          filename: string
          id: number
        }
        Insert: {
          created_at?: string | null
          filename: string
          id?: number
        }
        Update: {
          created_at?: string | null
          filename?: string
          id?: number
        }
      }
      profiles: {
        Row: {
          email: string
          id: number
          inserted_at: string
          name: string
          profile_picture: number
          updated_at: string
          username: string
          uuid: string
        }
        Insert: {
          email: string
          id?: number
          inserted_at?: string
          name: string
          profile_picture?: number
          updated_at?: string
          username: string
          uuid: string
        }
        Update: {
          email?: string
          id?: number
          inserted_at?: string
          name?: string
          profile_picture?: number
          updated_at?: string
          username?: string
          uuid?: string
        }
      }
      roles: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name?: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      strats: {
        Row: {
          author_id: number
          description: string
          id: number
          inserted_at: string
          map_id: number
          name: string
          privacy: string
          strat_position: string
          team_id: number | null
          updated_at: string
        }
        Insert: {
          author_id: number
          description: string
          id?: number
          inserted_at?: string
          map_id: number
          name: string
          privacy: string
          strat_position: string
          team_id?: number | null
          updated_at?: string
        }
        Update: {
          author_id?: number
          description?: string
          id?: number
          inserted_at?: string
          map_id?: number
          name?: string
          privacy?: string
          strat_position?: string
          team_id?: number | null
          updated_at?: string
        }
      }
      team_invitations: {
        Row: {
          created_at: string | null
          id: number
          player_id: number | null
          team_id: number | null
          team_role: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          player_id?: number | null
          team_id?: number | null
          team_role?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          player_id?: number | null
          team_id?: number | null
          team_role?: string | null
        }
      }
      team_members: {
        Row: {
          id: number
          inserted_at: string
          player_id: number
          role: string | null
          team_id: number
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          player_id: number
          role?: string | null
          team_id: number
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          player_id?: number
          role?: string | null
          team_id?: number
          updated_at?: string
        }
      }
      teams: {
        Row: {
          created_at: string | null
          id: number
          name: string
          organization: string | null
          team_leader: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          organization?: string | null
          team_leader?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          organization?: string | null
          team_leader?: number | null
        }
      }
      user_roles: {
        Row: {
          id: number
          role_id: number
          user_id: number
        }
        Insert: {
          id?: number
          role_id: number
          user_id: number
        }
        Update: {
          id?: number
          role_id?: number
          user_id?: number
        }
      }
    }
    Views: {
      profile_teams: {
        Row: {
          joined_at: string | null
          org: string | null
          player_id: number | null
          player_role: string | null
          profile_uuid: string | null
          team_id: number | null
          team_name: string | null
          total_players: number | null
        }
      }
    }
    Functions: {
      change_user_password: {
        Args: {
          current_plain_password: string
          new_plain_password: string
        }
        Returns: Json
      }
      is_strat_team_member: {
        Args: {
          _user_id: string
          _strat_id: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

