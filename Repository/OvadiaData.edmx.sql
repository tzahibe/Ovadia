
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 05/28/2017 15:14:07
-- Generated from EDMX file: C:\Users\Tzahi\Source\Repos\Ovadia\Repository\OvadiaData.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [HazonOvadia];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[StoreContainer].[db_Event]', 'U') IS NOT NULL
    DROP TABLE [StoreContainer].[db_Event];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'db_Event'
CREATE TABLE [dbo].[db_Event] (
    [eventId] int  NOT NULL,
    [full_date] nvarchar(255)  NULL,
    [event_name] nvarchar(255)  NULL,
    [from_hour] nvarchar(20)  NULL,
    [from_minutes] nvarchar(20)  NULL,
    [to_hour] nvarchar(20)  NULL,
    [to_minutes] nvarchar(20)  NULL,
    [event_status] nvarchar(50)  NULL,
    [event_date] datetime  NULL,
    [fixed] nvarchar(20)  NULL,
    [ID] int IDENTITY(1,1) NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [eventId], [ID] in table 'db_Event'
ALTER TABLE [dbo].[db_Event]
ADD CONSTRAINT [PK_db_Event]
    PRIMARY KEY CLUSTERED ([eventId], [ID] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------